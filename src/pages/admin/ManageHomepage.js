
import React from 'react';
import ImageEditor from '../../components/admin/ImageEditor';
import VideoEditor from '../../components/admin/VideoEditor';

const ManageHomepage = () => {
  return (
    <div>
      <h1>Manage Homepage</h1>
      <p>Here you can edit the content of the homepage.</p>

      <ImageEditor
        sectionId="homepage_main_image"
        title="Homepage Main Image (Fallback)"
        showPositionControl={true}
      />
      <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '-10px' }}>GIFs are supported. Use the dropdown to adjust the image position.</p>
      <VideoEditor
        sectionId="homepage_hero_video"
        title="Homepage Hero Video"
      />
      <ImageEditor
        sectionId="welcome_section_image"
        title="Welcome Section Image"
        showPositionControl={true}
      />
      <h2>Programs Section</h2>
      <ImageEditor
        sectionId="program_kids_image"
        title="Kids Program Image"
        showPositionControl={true}
      />
      <ImageEditor
        sectionId="program_homeschool_image"
        title="Homeschool Program Image"
        showPositionControl={true}
      />
      <ImageEditor
        sectionId="program_adult_image"
        title="Adult Program Image"
        showPositionControl={true}
      />
      <ImageEditor
        sectionId="program_fundamentals_image"
        title="Fundamentals Program Image"
        showPositionControl={true}
      />
      <ImageEditor
        sectionId="program_competition_image"
        title="Competition Training Image"
        showPositionControl={true}
      />
      <ImageEditor
        sectionId="program_private_lessons_image"
        title="Private Lessons Image"
        showPositionControl={true}
      />
      <h2>Facility Section</h2>
      <ImageEditor
        sectionId="facility_image_1"
        title="Facility Image 1"
        showPositionControl={true}
      />
      <ImageEditor
        sectionId="facility_image_2"
        title="Facility Image 2"
        showPositionControl={true}
      />
      <VideoEditor
        sectionId="facility_video"
        title="Facility YouTube Video"
      />
    </div>
  );
};

export default ManageHomepage;
