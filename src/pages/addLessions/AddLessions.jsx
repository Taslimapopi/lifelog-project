// import React from 'react';
import AddLessonForm from '../../Components/Form/AddLessonForm';

const MyLessons = () => {
    return (
        <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <AddLessonForm></AddLessonForm>
        </div>
    );
};

export default MyLessons;