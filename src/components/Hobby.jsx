import React, { useState, useRef, useEffect } from 'react';
//adding style.css


const Hobby = () => {
  const singingAudios = [
    { name: 'Aaj Din Chadheya', path: '/Hobby/Singing/aaj din chadheya.mp3' },
    // { name: 'Aaj Jane Ki Zidd Na Karo (opus)', path: '/Hobby/Singing/aaj jane ki zidd na karo .opus' },
    { name: 'Aaj Jane Ki Zidd Na Karo', path: '/Hobby/Singing/aaj jane ki zidd na karo.opus' },
    { name: 'Ae Re Sakhi', path: '/Hobby/Singing/ae_re_sakhi.mp4' },
    { name: 'Apki Akho Me Kuch', path: '/Hobby/Singing/apki_akho_me kuch.mp3' },
    // { name: 'Tu Aisa Kaise Hai', path: '/Hobby/Singing/arjun_birthday.mp4' },
    { name: 'Bole Chudiyan', path: '/Hobby/Singing/Bole Chudiyan.mp3' },
    { name: 'Bolo Na', path: '/Hobby/Singing/bolo_na.mp3' },
    { name: 'Bus Itna Hai Tum Se Kehna', path: '/Hobby/Singing/Bus itna hai tum se kehna.mp3' },
    { name: 'Dagabaazre', path: '/Hobby/Singing/dagabaazre.mp3' },
    { name: 'Dekha Hazaro Dafa', path: '/Hobby/Singing/Dekha Hazaro dafa.mp3' },
    { name: 'Ekadantaya Vakratundaya', path: '/Hobby/Singing/Ekadantaya_Vakratundaya.mp3' },
    { name: 'Kaise Ab Kahein', path: '/Hobby/Singing/kaise ab kahein.mp3' },
    { name: 'Kaun Tujhe', path: '/Hobby/Singing/Kaun Tujhe.mp3' },
    { name: 'Khuda Jane', path: '/Hobby/Singing/Khuda jane.mp3' },
    { name: 'Mora Saiyaan', path: '/Hobby/Singing/Mora Saiyaan.mp3' },
    { name: 'O Sajni Re', path: '/Hobby/Singing/o_sajni_re.mp3' },
    { name: 'Ram Ratan Dhan Payo', path: '/Hobby/Singing/ram ratan dhan payo.mp3' },
    // { name: 'Ram Ratan', path: '/Hobby/Singing/ram_ratan.mp4' },
    { name: 'Sajni Re', path: '/Hobby/Singing/sajni_re.mp3' },
    { name: 'Tere Hawale', path: '/Hobby/Singing/tere hawale.mp4' },
    { name: 'Tu Aisa Kese Hai', path: '/Hobby/Singing/tu aisa kese hai.mp3' },
    { name: 'Tumtak', path: '/Hobby/Singing/tumtak.mp3' },
    { name: 'Vida Karo', path: '/Hobby/Singing/Vida karo.mp3' },
    // { name: 'Vo Dekhne Me', path: '/Hobby/Singing/Vo_dekhne_me.mp4' },
    // { name: 'WhatsApp Video 2024-08-14 at 18.01.30', path: '/Hobby/Singing/WhatsApp Video 2024-08-14 at 18.01.30_ffc431f0.mp4' },
    { name: 'Wo Dekhne Me', path: '/Hobby/Singing/Wo dekhne me.mp3' },
    { name: 'Yeh Dil Tum Bin Kahin Lagtaa Nahii', path: '/Hobby/Singing/Yeh dil tum bin kahin lagtaa nahii.mp3' },
  ];

  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const audioRef = useRef(null);

  const playAudio = (audio) => {
    if (currentAudio && currentAudio.path === audio.path) {
      // Toggle play/pause for same audio
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      // Play new audio
      setCurrentAudio(audio);
      setIsPlaying(true);
    }
  };

  const filteredAudios = singingAudios.filter(audio =>
    audio.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (currentAudio && audioRef.current) {
      const playAudio = async () => {
        try {
          audioRef.current.pause();
          audioRef.current.load();
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        }
      };
      playAudio();
    }
  }, [currentAudio]);

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  const handleAudioPlay = () => {
    setIsPlaying(true);
  };

  const handleAudioPause = () => {
    setIsPlaying(false);
  };

  const formatAudioName = (name) => {
    return name.length > 25 ? name.substring(0, 25) + '...' : name;
  };

  return (
    <section id="hobby" className="hobby-section">
      <h2 className="section-title">My Hobbies</h2>
      <div className="hobby-content">
        <h3>Singing Collection</h3>
        <p className="hobby-description">Explore my collection of recorded songs and performances</p>
        
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Audio List */}
        <div className="singing-list">
          {filteredAudios.map((audio, index) => (
            <React.Fragment key={index}>
              <div 
                className={`audio-item ${currentAudio && currentAudio.path === audio.path ? 'active' : ''}`}
                onClick={() => playAudio(audio)}
              >
                <div className="audio-info">
                  <span className="audio-number">{index + 1}</span>
                  <span className="audio-name">{formatAudioName(audio.name)}</span>
                </div>
                <button 
                  className={`play-button ${currentAudio && currentAudio.path === audio.path && isPlaying ? 'playing' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    playAudio(audio);
                  }}
                >
                  {currentAudio && currentAudio.path === audio.path && isPlaying ? '❚❚' : '▶'}
                </button>
              </div>
              
              {/* Now Playing Section - Only show below the currently playing song */}
              {currentAudio && currentAudio.path === audio.path && (
                <div className="current-player-inline">
                  <div className="now-playing">
                    <h4>Now Playing</h4>
                    <p className="current-song-name">{currentAudio.name}</p>
                  </div>
                  <audio 
                    ref={audioRef} 
                    controls 
                    onEnded={handleAudioEnd}
                    onPlay={handleAudioPlay}
                    onPause={handleAudioPause}
                    className="audio-player"
                  >
                    <source
                      src={currentAudio.path}
                      type={
                        currentAudio.path.endsWith('.mp4')
                          ? 'video/mp4'
                          : currentAudio.path.endsWith('.opus')
                          ? 'audio/ogg'
                          : 'audio/mpeg'
                      }
                    />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Stats */}
        <div className="audio-stats">
          <p>Total Songs: {singingAudios.length} | Showing: {filteredAudios.length}</p>
        </div>
      </div>
    </section>
  );
};

export default Hobby;