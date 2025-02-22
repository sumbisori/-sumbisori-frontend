import { TimeLabel } from '../TimeLabel/TimeLabel';

interface Props {
  inputLabel: string;
  options: string[];
  value: string;
  onSelectOption: (option: string) => void;
}

export const OptionsInput = ({
  inputLabel,
  options,
  value,
  onSelectOption,
}: Props) => {
  return (
    <div className="flex flex-col gap-[0.938rem]">
      <div className="block text-sm font-semibold text-gray-900">
        {inputLabel}
      </div>
      <div className="hide-scroll flex gap-2.5 overflow-x-auto">
        {options.map((option) => (
          <div key={option} className="shrink-0 py-1">
            <TimeLabel
              onClick={() => onSelectOption(option)}
              isSelected={value === option}
            >
              {option}
            </TimeLabel>
          </div>
        ))}
      </div>
    </div>
  );
};
