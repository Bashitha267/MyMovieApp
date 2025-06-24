import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');
const apikey = 'b595089bbce12e3f85f4b29ba3bab776';

const CarouselWithDots = () => {
  const [images, setImages] = useState<{ id: number; imageUrl: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getMovieImages = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${apikey}`
        );
        const data = await res.json();
        const imageUrls = data.results
          .slice(0, 5)
          .map((movie: any) => ({
            id: movie.id,
            imageUrl: `https://image.tmdb.org/t/p/w780${movie.backdrop_path || movie.poster_path}`,
          }));
        setImages(imageUrls);
      } catch (e) {
        console.error('Failed to fetch trending movies:', e);
      }
    };
    getMovieImages();
  }, []);

  return (
    <View style={styles.container}>
      {images.length > 0 && (
        <>
          <Carousel
            ref={carouselRef}
            width={width * 0.9}
            height={250}
            data={images}
            scrollAnimationDuration={800}
            loop
            onSnapToItem={(index) => setCurrentIndex(index)}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => router.push(`/Movie/${item.id}`)}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
          />
          <View style={styles.dotsContainer}>
            {images.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (carouselRef.current) {
                    carouselRef.current.scrollTo({ index, animated: true });
                  }
                }}
              >
                <View
                  style={[
                    styles.dot,
                    currentIndex === index ? styles.activeDot : styles.inactiveDot,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

export default CarouselWithDots;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FF3C38', // red
  },
  inactiveDot: {
    backgroundColor: '#888', // gray
  },
});
