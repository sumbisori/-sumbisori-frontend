import { useNavigate } from 'react-router-dom';
import LogoBlackIcon from '@/icons/sumbisori_logo_width_black.svg?react';
import LogoWhiteIcon from '@/icons/sumbisori_logo_width_white.svg?react';
import BellBlackIcon from '@/icons/Icon_bell_black.svg?react';
import BellWhiteIcon from '@/icons/Icon_bell_white.svg?react';
import ContourIcon from '@/icons/contour.svg?react';

interface Props {
  type?: 'dark' | 'light';
  caption?: string;
  absolute: boolean;
}

export const Header = ({ type = 'light', caption, absolute }: Props) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/home');
  };
  return (
    <header
      className={`flex h-[3.75rem] w-full min-w-full-layout max-w-full-layout justify-between px-5 ${
        absolute ? 'absolute inset-x-0 top-0 z-20 m-auto' : 'relative'
      }`}
      style={{
        textAlign: 'center', // 텍스트 정렬
        lineHeight: 'normal', // 텍스트의 줄 간격을 고정
      }}
    >
      <div className="flex items-center">
        {type === 'dark' ? (
          <LogoBlackIcon className="cursor-pointer" onClick={handleNavigate} />
        ) : (
          <LogoWhiteIcon className="cursor-pointer" onClick={handleNavigate} />
        )}
        {caption && (
          <div className="ml-2 flex items-center gap-2">
            <ContourIcon />
            <p className="text-[1.375rem] font-bold text-gray-900">{caption}</p>
          </div>
        )}
      </div>

      <div className="flex items-center">
        {type === 'dark' ? (
          <BellBlackIcon className="cursor-pointer" />
        ) : (
          <BellWhiteIcon className="cursor-pointer" />
        )}
      </div>
    </header>
  );
};
