export type Coordinates = {
    x: number,
    y: number
}

export type Angles = {
    startAngle: number,
    endAngle: number
}

export type GemStone = {
    name: string,
    hardness: number
}

export type Padding = {
    top: number
    right: number,
    bottom: number,
    left: number,
}

export type OnResize = (width: number, height: number) =>  void