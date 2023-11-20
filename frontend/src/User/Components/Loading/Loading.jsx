import React, { useState } from 'react';
import './Loading.css'
const LoadingModal = () => {
  // const [isLoading, setIsLoading] = useState(true);

  // // Hàm để hiển thị modal loading
  // const showLoadingModal = () => {
  //   setIsLoading(true);
  // };

  // // Hàm để ẩn modal loading
  // const hideLoadingModal = () => {
  //   setIsLoading(false);
  // };

  return (
    <div>
        <div className="modal-overlay_load">
            <div className="loader_load"></div>
        </div>
    </div>
  );
};

export default LoadingModal;
