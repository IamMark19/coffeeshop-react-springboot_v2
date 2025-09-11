import { priceWithSign } from '@/utils/helper';
import LabelValueRow from './LabelValueRow';

/**
 * @description A component that displays a label and a price in a row.
 * @param {string} lable The label to be displayed.
 * @param {number} amount The amount to be displayed.
 */
interface PriceRowProps {
  lable: string;
  amount: number;
}
export default function PriceRow({ lable, amount }: PriceRowProps) {
  return <LabelValueRow lable={lable} value={priceWithSign(amount)} />;
}
