import { motion } from 'framer-motion';
import { ReservationHaenyeoPlace } from '@/api/haenyeoPlaces';
import PhoneIcon from '@/icons/phone.svg?react';
import MarkLinkIcon from '@/icons/mark-link.svg?react';
import { RoundedButton } from '../RoundedButton';
import { LargeButton } from '../LargeButton';
import { useRef } from 'react';
import { ShowModalType } from '@/pages/HaenyeoPlaces';
import { getPlacePrice } from '@/util/getPlacePrice';
import { SquareGrayCard } from '../SquareGrayCard';

interface Props {
  selectedPlace: ReservationHaenyeoPlace;
  showModal: ShowModalType;
  onMoreInfo: () => void;
}

export function HaenyeoPlaceDetailSheet({
  selectedPlace,
  showModal,
  onMoreInfo,
}: Props) {
  const handlePhoneClick = () => {
    window.open(`tel:${selectedPlace.phoneNumber}`);
  };

  const handleLinkClick = () => {
    window.open(selectedPlace.link, '_blank');
  };

  const mainContainerRef = useRef<HTMLDivElement>(null);

  const splitTextByTwo = (text: string) => {
    // 정규표현식을 사용해 두 글자씩 배열로 분리한 후, 줄바꿈 문자("\n")로 합칩니다.
    const matchedText = text.match(/.{1,2}/g);
    return matchedText ? matchedText.join('\n') : '';
  };

  return (
    <div
      className={
        showModal === 'small'
          ? // 기본 모드: 하단에 고정
            'absolute bottom-0 left-0 z-100 w-full min-w-full-layout max-w-full-layout'
          : // 확장 모드: 지도 위 전체를 덮도록
            'absolute inset-0 z-100 bg-white'
      }
    >
      <>
        {showModal === 'small' && (
          // 기본 모드 레이아웃
          <motion.div
            {...unExpandedAnimation}
            ref={mainContainerRef}
            className="relative flex flex-col justify-between rounded-t-xl bg-white px-5 pb-4 pt-11 shadow-lg"
          >
            <div className="absolute -top-14 left-4 rounded-2xl border border-[#F6F6F6] bg-white p-1">
              <img
                src={selectedPlace.imageUrl}
                alt="place-image"
                className="size-[4.813rem] rounded-2xl"
              />
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-[1.25rem] font-bold">
                    {selectedPlace.name}
                  </p>
                  <p className="truncate text-[0.875rem]">
                    {selectedPlace.address}
                  </p>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="text-[1.25rem] font-bold">
                    {getPlacePrice(
                      selectedPlace.minPrice,
                      selectedPlace.maxPrice,
                    )}
                    원
                  </span>
                  <div className="flex gap-4">
                    <PhoneIcon
                      className="cursor-pointer"
                      onClick={handlePhoneClick}
                    />
                    <MarkLinkIcon
                      className="cursor-pointer"
                      onClick={handleLinkClick}
                    />
                  </div>
                </div>
              </div>
              <div
                id="button-container"
                className="flex w-full flex-nowrap gap-2"
              >
                <RoundedButton
                  buttonType="secondary"
                  styleClass="flex-1"
                  onClick={onMoreInfo}
                >
                  기본정보 더보기
                </RoundedButton>
                <RoundedButton buttonType="primary" onClick={handleLinkClick}>
                  예약하기
                </RoundedButton>
              </div>
            </div>
          </motion.div>
        )}
        {showModal === 'full' && (
          // 확장 모드 레이아웃

          <motion.div
            {...expandedAnimation}
            className="relative flex flex-col bg-gray-100"
          >
            {/* 상단 이미지 300px 높이 */}
            <img
              src={selectedPlace.imageUrl}
              alt="place-image"
              className="h-[342px] w-full object-cover"
            />
            <div className="bg-white p-5">
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-[1.25rem] font-bold">
                    {selectedPlace.name}
                  </p>
                  <p className="text-[0.875rem]">{selectedPlace.address}</p>
                </div>
                <div
                  id="expanded-place-button-container"
                  className="flex gap-4"
                >
                  <div className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5">
                    <PhoneIcon
                      className="cursor-pointer"
                      onClick={handlePhoneClick}
                    />
                    <p>전화</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5">
                    <MarkLinkIcon
                      className="cursor-pointer"
                      onClick={handleLinkClick}
                    />
                    <p>네이버지도</p>
                  </div>
                </div>
                <span className="text-[1.25rem] font-bold">
                  {getPlacePrice(
                    selectedPlace.minPrice,
                    selectedPlace.maxPrice,
                  )}
                  원
                </span>
              </div>
            </div>
            <section
              id="expanded-place-detail"
              className="flex h-full flex-col p-4"
            >
              <div className="flex flex-1 flex-col gap-4 rounded-2xl bg-white p-5">
                <h3 className="text-[1.125rem] font-bold">체험 상세정보</h3>
                <div className="flex flex-col gap-2">
                  {selectedPlace.details.map((detail, index) => (
                    <div
                      className="flex items-center gap-2"
                      key={detail.title + index}
                    >
                      <SquareGrayCard
                        type="content"
                        className="whitespace-pre-wrap"
                        size="20%"
                      >
                        {splitTextByTwo(detail.title)}
                      </SquareGrayCard>
                      <p className="w-4/5">{detail.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div
                id="button-container"
                className="mt-4 flex w-full flex-nowrap gap-2"
              >
                <LargeButton>예약하기</LargeButton>
              </div>
            </section>
          </motion.div>
        )}
      </>
    </div>
  );
}

const unExpandedAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

const expandedAnimation = {
  initial: { y: '100%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: '100%', opacity: 0 },
  transition: { duration: 0.3 },
};
