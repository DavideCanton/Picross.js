import { JSONSchemeData } from '../services/table/table.service';

type CheckFunc = (CellStatus) => void;

export enum EnvironmentEnum {
    DEV,
    PROD
}

export interface IEnvironment {
    env: EnvironmentEnum;
}

export const enum CellStatus {
    OPEN,
    CLOSED,
    GRAYED
}

export const enum SeqStatus {
    EQUAL,
    WRONG,
    NOT_EQUAL
}

export interface RowData {
    label: number[];
    disabled: boolean;
    status: SeqStatus;
}

export class PicrossTable {
    r: number;
    c: number;
    table: CellStatus[][];
    rows: RowData[];
    cols: RowData[];

    constructor(r: number, c: number) {
        this.r = r;
        this.c = c;
    }

    static randomTable(r: number, c: number, percentage: number): PicrossTable {
        const table = new PicrossTable(r, c);

        table.fillWithRandomData(percentage);

        return table;
    }

    getCellStatus(i: number, j: number): CellStatus {
        return this.table[i][j];
    }

    setCellStatus(i: number, j: number, status: CellStatus): void {
        this.table[i][j] = status;
    }

    closeCell(i: number, j: number): void {
        const status = this.getCellStatus(i, j);
        switch (status) {
            case CellStatus.CLOSED:
                this.table[i][j] = CellStatus.OPEN;
                break;
            case CellStatus.OPEN:
                this.table[i][j] = CellStatus.CLOSED;
                break;
            case CellStatus.GRAYED:
                this.table[i][j] = CellStatus.OPEN;
                break;
        }
    }

    grayCell(i: number, j: number): void {
        const status = this.getCellStatus(i, j);
        switch (status) {
            case CellStatus.CLOSED:
                this.table[i][j] = CellStatus.GRAYED;
                break;
            case CellStatus.OPEN:
                this.table[i][j] = CellStatus.GRAYED;
                break;
            case CellStatus.GRAYED:
                this.table[i][j] = CellStatus.OPEN;
                break;
        }
    }

    private * makeRowGenerator(r: number): Iterable<CellStatus> {
        yield* this.table[r];
    }

    private * makeColGenerator(c: number): Iterable<CellStatus> {
        for (let i = 0; i < this.r; i++) {
            yield this.getCellStatus(i, c);
        }
    }

    private computeActualLabels(gen: Iterable<CellStatus>): number[] {
        let row = [...this.blocks(gen)];

        if (row.length === 0) {
            row = [0];
        }

        return row;
    }

    private computeActualRowLabels(r: number): number[] {
        return this.computeActualLabels(this.makeRowGenerator(r));
    }

    private computeActualColLabels(c: number): number[] {
        return this.computeActualLabels(this.makeColGenerator(c));
    }

    private * blocks(res: Iterable<CellStatus>): Iterable<number> {
        let currentInBlock = false;
        let cur = 0;

        for (const status of res) {
            if (status === CellStatus.CLOSED) {
                if (!currentInBlock) {
                    currentInBlock = true;
                }

                cur++;
            } else if (cur > 0) {
                yield cur;
                cur = 0;
                currentInBlock = false;
            }
        }

        if (currentInBlock) {
            yield cur;
        }
    }

    private fillWithRandomData(percentage: number): void {
        this.table = [];
        for (let i = 0; i < this.r; i++) {
            const row = new Array<CellStatus>(this.c);

            for (let j = 0; j < this.c; j++) {
                row[j] = Math.random() <= percentage ? CellStatus.CLOSED : CellStatus.OPEN;
            }
            this.table[i] = row;
        }

        this.setupData();
    }

    getRowsData(): RowData[] {
        return this.rows;
    }

    getColsData(): RowData[] {
        return this.cols;
    }

    getRowData(index: number): RowData {
        return this.rows[index];
    }

    getColData(index: number): RowData {
        return this.cols[index];
    }

    isCompleted(): boolean {
        return (this.rows.every(data => data.status === SeqStatus.EQUAL) &&
            this.cols.every(data => data.status === SeqStatus.EQUAL));
    }

    updateRowStatus(r: number): void {
        this.rows[r].status = PicrossTable.computeSeqStatus(this.rows[r].label, this.computeActualRowLabels(r));
    }

    updateColStatus(c: number): void {
        this.cols[c].status = PicrossTable.computeSeqStatus(this.cols[c].label, this.computeActualColLabels(c));
    }

    // tslint:disable-next-line:member-ordering
    private static computeSeqStatus(labels: number[], seqGroups: number[]): SeqStatus {
        if (labels.length < seqGroups.length) {
            return SeqStatus.WRONG;
        } else if (labels.length > seqGroups.length) {
            return SeqStatus.NOT_EQUAL;
        }

        for (let i = 0; i < labels.length; i++) {
            if (labels[i] < seqGroups[i]) {
                return SeqStatus.WRONG;
            } else if (labels[i] > seqGroups[i]) {
                return SeqStatus.NOT_EQUAL;
            }
        }
        return SeqStatus.EQUAL;
    }

    private setupData(): void {
        this.rows = [];
        this.cols = [];

        const params = [
            [this.rows, this.r, this.computeActualRowLabels.bind(this)],
            [this.cols, this.c, this.computeActualColLabels.bind(this)]
        ];

        params.forEach(val =>
            ((array: RowData[], len: number, fun: (number) => number[]) => {
                for (let i = 0; i < len; i++) {
                    const label = fun(i);
                    const disabled = label.length === 1 && label[0] === 0;

                    array.push(<RowData>{
                        label: label,
                        disabled: disabled,
                        status: disabled ? SeqStatus.EQUAL : SeqStatus.NOT_EQUAL
                    });
                }
            }).apply(this, val));

        for (let i = 0; i < this.r; i++) {
            const row = new Array<CellStatus>(this.c);
            const row_disabled = this.getRowData(i).disabled;

            for (let j = 0; j < this.c; j++) {
                if (row_disabled) {
                    row[j] = CellStatus.GRAYED;
                } else {
                    row[j] = this.getColData(j).disabled ? CellStatus.GRAYED : CellStatus.OPEN;
                }
            }
            this.table[i] = row;
        }
    }

    clear() {
        this.table.forEach((row, i) => {
            if (this.rows[i].disabled) {
                return;
            }

            row.forEach((_, j) => {
                if (this.cols[j].disabled) {
                    return;
                }
                row[j] = CellStatus.OPEN;

                this.cols[j].status = SeqStatus.NOT_EQUAL;
            });

            this.rows[i].status = SeqStatus.NOT_EQUAL;
        });
    }
}
