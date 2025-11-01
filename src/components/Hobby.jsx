import React, { useState, useRef, useEffect } from 'react';
//adding style.css


const Hobby = () => {
  const singingAudios = [
    { name: 'Aaj Din Chadheya', path: '/Hobby/Singing/aaj_din_chadheya.mp3' },
    { name: 'Aaj Jane Ki Zidd Na Karo', path: '/Hobby/Singing/aaj_jane_ki_zidd_na_karo.opus' },
    { name: 'Aise Kyun', path: '/Hobby/Singing/aise_kyun.opus' },
    { name: 'Apki Akho Me Kuch', path: '/Hobby/Singing/apki_akho_me kuch.mp3' },
    { name: 'Bole Chudiyan', path: '/Hobby/Singing/Bole_Chudiyan.mp3' },
    { name: 'Bolo Na', path: '/Hobby/Singing/bolo_na.mp3' },
    { name: 'Bus Itna Hai Tum Se Kehna', path: '/Hobby/Singing/Bus_itna_hai_tum_se_kehna.mp3' },
    { name: 'Dagabaazre', path: '/Hobby/Singing/dagabaazre.mp3' },
    { name: 'Dekha Hazaro Dafa', path: '/Hobby/Singing/dekha_hazaro_dafa.mp3' },
    { name: 'Dil Da Vasta', path: '/Hobby/Singing/dil_da_vasta.mp3' },
    { name: 'Ekadantaya Vakratundaya', path: '/Hobby/Singing/Ekadantaya_Vakratundaya.mp3' },
    { name: 'Finding Him', path: '/Hobby/Singing/finding_him.m4a' },
    { name: 'Hum Tere Pyar Me', path: '/Hobby/Singing/hum_tere_pyar_me.m4a' },
    { name: 'Kaise Ab Kahe', path: '/Hobby/Singing/kaise_ab_kahe.mp3' },
    { name: 'Kaun Tujhe', path: '/Hobby/Singing/Kaun_Tujhe.mp3' },
    { name: 'Khuda Jane Ke', path: '/Hobby/Singing/khuda_jane_ke.mp3' },
    { name: 'Main Rahu Ya Na Rahu', path: '/Hobby/Singing/main_rahu_ya_na_rahu.mp3' },
    { name: 'Mora Saiyaan', path: '/Hobby/Singing/Mora_Saiyaan.mp3' },
    { name: 'O Sajni Re', path: '/Hobby/Singing/o_sajni_re.mp3' },
    { name: 'Ram Ratan Dhan Payo', path: '/Hobby/Singing/ram_ratan_dhan_payo.mp3' },
    { name: 'Sajni Re', path: '/Hobby/Singing/sajni_re.mp3' },
    { name: 'Savan Beeto Jai', path: '/Hobby/Singing/savan_beeto_jai.mp3' },
    { name: 'Tere Hawale', path: '/Hobby/Singing/tere_hawale.mp3' },
    { name: 'Tu Aisa Kese Hai', path: '/Hobby/Singing/tu_aisa_kese_hai.mp3' },
    { name: 'Tumtak', path: '/Hobby/Singing/tumtak.mp3' },
    { name: 'Vida Karo', path: '/Hobby/Singing/Vida_karo.mp3' },
    { name: 'Wo Dekhne Me', path: '/Hobby/Singing/Wo_dekhne_me.mp3' },
    { name: 'Ye Dil Tum Bin', path: '/Hobby/Singing/ye_dil_tum_bin.mp3' },
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
