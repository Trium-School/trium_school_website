export default function CampusVideo() {
  return (
    <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-xl">
      <video
        className="block aspect-video w-full"
        src="/media/campus-video.mp4"
        poster="/media/campus-video-thumbnail.png"
        controls
        playsInline
        preload="none"
        aria-label="The Trium School campus video"
      />
    </div>
  );
}
