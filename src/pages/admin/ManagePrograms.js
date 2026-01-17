
import React from 'react';
import ImageEditor from '../../components/admin/ImageEditor';

const ManagePrograms = () => {
  return (
    <div>
      <h1>Manage Program Pages</h1>
      <p>Here you can edit the main images for each program page.</p>

      <ImageEditor
        sectionId="kids_program_image"
        title="Kids Program Page Image"
        showPositionControl={true}
      />

      <ImageEditor
        sectionId="homeschool_program_image"
        title="Homeschool Program Page Image"
        showPositionControl={true}
      />

      <ImageEditor
        sectionId="adult_program_image"
        title="Adult Program Page Image"
        showPositionControl={true}
      />

      <ImageEditor
        sectionId="fundamentals_program_image"
        title="Fundamentals Program Page Image"
        showPositionControl={true}
      />

      <ImageEditor
        sectionId="competition_training_image"
        title="Competition Training Page Image"
        showPositionControl={true}
      />

      <ImageEditor
        sectionId="private_lessons_image"
        title="Private Lessons Page Image"
        showPositionControl={true}
      />

    </div>
  );
};

export default ManagePrograms;
