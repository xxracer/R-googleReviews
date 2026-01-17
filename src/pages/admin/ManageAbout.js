import React from 'react';
import ImageEditor from '../../components/admin/ImageEditor';

const ManageAbout = () => {
  return (
    <div>
      <h1>Manage About Us Page</h1>
      <p>Here you can edit the content of the "About Us" page.</p>

      <ImageEditor
        sectionId="about_us_image"
        title="About Us Page Image"
        showPositionControl={true}
      />

    </div>
  );
};

export default ManageAbout;
