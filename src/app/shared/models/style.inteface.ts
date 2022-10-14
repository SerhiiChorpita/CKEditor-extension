export interface IStyle {
    textSize: string,
    fontFamily: string,
    color: string,
    bgColor: string,
    bold: boolean,
    italic: boolean
    underline: boolean
}

export interface ITL {
    table: boolean,
    list: boolean
}

export interface ITable {
    row: number,
    cell: number,
    width: number,
    height: number,
    borderWidth: number,
    borderType: string,
    borderColor: string
}

export interface IList {
    lisItems: number,
    typeList: string,
    typeMark: string
}