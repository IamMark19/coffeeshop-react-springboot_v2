import ButtonFilled from '@/components/shared/button/ButtonFilled';
import ButtonOutline from '@/components/shared/button/ButtonOutline';
import { LocationMarkerIcon } from '@heroicons/react/outline';

interface ControlButtonsProps {
  onCancelClick: () => void;
  onConfirmClick: () => void;
  onCurrentLocationClick: () => void;
  confirmBtnDisabled: boolean;
}

export default function ControlButtons({
  onCancelClick,
  onConfirmClick,
  onCurrentLocationClick,
  confirmBtnDisabled,
}: ControlButtonsProps) {
  return (
    <>
      <div className="mt-4">
        <button
          className="w-full text-primary-400 font-semibold text-lg flex items-center justify-center"
          onClick={onCurrentLocationClick}
        >
          <LocationMarkerIcon className="w-6 h-6" />
          <p className="ml-2">Use my current location</p>
        </button>
      </div>
      <div className="flex justify-between mt-4">
        <ButtonOutline onClick={onCancelClick}>Cancel</ButtonOutline>
        <ButtonFilled onClick={onConfirmClick} disabled={confirmBtnDisabled}>
          Confirm
        </ButtonFilled>
      </div>
    </>
  );
}
