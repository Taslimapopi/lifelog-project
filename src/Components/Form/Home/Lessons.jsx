import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import LessonCard from './LessonCard';
import LoadingSpinner from '../../../pages/LoadingSpinner';

const Lessons = () => {
    const { data: lessons = [], isLoading } = useQuery({
    queryKey: ['lessons'],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/home-lessons`)
      return result.data
    },
  })

  if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            {lessons && lessons.length > 0 ? (
        <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {lessons.map(lesson => (
            <LessonCard key={lesson._id} lesson={lesson}></LessonCard>
            // <Card key={lessons._id} plant={lesson} />
          ))}
        </div>
      ) : null}
        </div>
    );
};

export default Lessons;