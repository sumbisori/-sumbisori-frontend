import { ReservationInfo } from '../../components/ReservationInfo/ReservationInfo';
import { Input } from '../../components/Input';
import { NumberInput } from '../../components/NumberInput';
import { OptionsInput } from '../../components/OptionsInput';
import { useState } from 'react';
import { LargeButton } from '../../components/LargeButton';
import {
  PostReservation,
  ReservationHaenyeoPlace,
  getReservationHaenyeoPlace,
  postReservation,
} from '../../api/reservation';
import { queryKeys } from '../../query-keys';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useModalContext } from '../../contexts/ModalContext';
import { AlertBox } from '../../components/AlertBox';

export const ReservationCreate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalContext();
  const [form, setForm] = useState<PostReservation>({
    place: params.placeValue || '',
    personName: '',
    selectedAvailableDate: '',
    selectedTime: '',
    peopleCount: 0,
    phone: '',
  });

  const reservationMutation = useMutation({
    mutationFn: postReservation,
    onSettled: async () => {
      openModal('reservationSuccess');
      setTimeout(() => {
        navigate('/');
        closeModal();
      }, 1000);
    },
  });

  const handleReservation = () => {
    reservationMutation.mutate(form);
  };

  const { data: haenyeoPlace } = useQuery<ReservationHaenyeoPlace>({
    queryKey: [queryKeys.haenyeoPlaceOption, params.placeValue],
    queryFn: async () => {
      if (!params.placeValue)
        return {
          value: '',
          name: '',
          address: '',
          price: 0,
          desc: '',
          imageUrl: '',
          availableDate: [],
          x: 0,
          y: 0,
        };
      const haenyeoPlace = await getReservationHaenyeoPlace(params.placeValue);
      return haenyeoPlace;
    },
  });

  return (
    <div className="mt-[60px]">
      <div className="p-[18px]">
        {haenyeoPlace && (
          <ReservationInfo
            imageSrc={haenyeoPlace.imageUrl}
            title={haenyeoPlace.name}
            address={haenyeoPlace.address}
            price={haenyeoPlace.price}
          />
        )}
      </div>
      <div className="h-[5px] w-full bg-[#F7F7FA]"></div>
      <div className="flex h-full flex-col justify-between gap-[12px] p-[18px]">
        <div>
          <Input
            id="name"
            inputLabel="예약자명"
            value={form.personName}
            onChange={(e) =>
              setForm({
                ...form,
                personName: e.target.value,
              })
            }
          />
          <Input
            id="phone"
            inputLabel="전화번호"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />
          <OptionsInput
            inputLabel="날짜"
            options={haenyeoPlace?.availableDate || []}
            value={form.selectedAvailableDate}
            onSelectOption={(option) =>
              setForm({
                ...form,
                selectedAvailableDate: option,
              })
            }
          />
          <OptionsInput
            inputLabel="날짜"
            options={['오전 09:00', '오후 12:00', '오후 03:00']}
            value={form.selectedTime}
            onSelectOption={(option) =>
              setForm({
                ...form,
                selectedTime: option,
              })
            }
          />
          <NumberInput
            id="peopleCount"
            inputLabel="인원"
            value={form.peopleCount}
            onChange={(e) =>
              setForm({
                ...form,
                peopleCount: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="mt-[50px]">
          <LargeButton
            onClick={handleReservation}
            disabled={
              !form.personName.trim() ||
              !form.selectedAvailableDate ||
              !form.selectedTime ||
              form.peopleCount <= 0
            }
          >
            예약하기
          </LargeButton>
        </div>
      </div>
      <AlertBox id="reservationSuccess">
        <div className="flex size-full flex-col items-center justify-center text-lg font-bold text-gray-900">
          <img src="/images/haenyeo.png"></img>
          예약이 완료되었습니다!
        </div>
      </AlertBox>
    </div>
  );
};
