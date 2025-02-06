import { IMAGE_PATHS } from '@/constant';
import { ImageWithTextAlert } from '../ImageWithTextAlert';
import { HomeYoutube } from './HomeYoutube';
import { YoutubeVideoType } from '@/api/home';
import Skeleton from '../Skeleton';
import { HomeYoutubeSkeleton } from './HomeYoutubeSkeleton';

interface HomeYoutubeListProps {
  videos: YoutubeVideoType[];
  selectedVideo: YoutubeVideoType | null;
  onSelectToPlay: (video: YoutubeVideoType) => void;
  onSelectToClose: () => void;
  youtubeLoading: boolean;
}

export const HomeYoutubeList = ({
  videos,
  selectedVideo,
  onSelectToPlay,
  onSelectToClose,
  youtubeLoading,
}: HomeYoutubeListProps) => {
  console.log(youtubeLoading);
  return (
    <div>
      {/* 영상 리스트 */}
      {videos.length > 0 && (
        <ul className="flex flex-col gap-3">
          {!youtubeLoading &&
            videos.map((video) => (
              <HomeYoutube
                key={video.videoId}
                video={video}
                selectedVideoId={selectedVideo?.videoId || null}
                onSelectToPlay={(video: YoutubeVideoType) =>
                  onSelectToPlay(video)
                }
                onSelectToClose={onSelectToClose}
              />
            ))}
          {youtubeLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <HomeYoutubeSkeleton key={index} />
            ))}
        </ul>
      )}

      {videos.length === 0 && !youtubeLoading && (
        <div className="h-[25rem]">
          <ImageWithTextAlert
            src={`${IMAGE_PATHS.ROOT}/haenyeo_sad.png`}
            alt="정보없음"
            text="관련 영상이 없습니다."
          />
        </div>
      )}
    </div>
  );
};
