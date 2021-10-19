import { BarColumnSparkline, Format, FormatterParams, NodeDatum } from './barColumnSparkline';

export interface ColumnNodeDatum extends NodeDatum {}
export interface ColumnFormatterParams extends FormatterParams{}
export interface ColumnFormat extends Format{}
export class ColumnSparkline extends BarColumnSparkline {
    static className = 'ColumnSparkline';
}