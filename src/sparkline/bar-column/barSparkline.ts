import { BarColumnSparkline, Format, FormatterParams, NodeDatum } from './barColumnSparkline';

export interface BarFormatterParams extends FormatterParams {}
export interface BarFormat extends Format {}
export interface BarNodeDatum extends NodeDatum {}
export class BarSparkline extends BarColumnSparkline {

    static className = 'barSparkline';

    protected isBarSparkline: boolean = true;
}