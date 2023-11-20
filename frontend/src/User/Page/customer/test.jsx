import React from "react";
import { Link, Element } from "react-scroll";

const MyComponent = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="section1" spy={true} smooth={true} duration={500}>
              Section 1
            </Link>
          </li>
          <li>
            <Link to="section2" spy={true} smooth={true} duration={500}>
              Section 2
            </Link>
          </li>
          {/* Thêm các liên kết cho các phần khác cần cuộn đến */}
        </ul>
      </nav>

      <Element name="section1" className="element">
        <h1>Section 1</h1>
        <p style={{fontSize:'20px'}}>
        Cách đây ba năm, Trường ĐH Kinh tế TP.HCM đưa ra chính sách khen thưởng cho giảng viên có bài báo công bố quốc tế. Mức thưởng cao nhất 200 triệu đồng/bài. Số lượng bài báo công bố quốc tế của trường cũng tăng dần đều trong những năm gần đây. Trong đó, năm 2016 có 44 bài, 2017 là 57 bài, 2018 là 60 bài và năm 2019 có 82 bài.

GS.TS Nguyễn Trọng Hoài - phó hiệu trưởng Trường ĐH Kinh tế TP.HCM - cho biết chính sách khuyến khích cũng phần nào giúp gia tăng bài báo quốc tế của trường bên cạnh các quy định về nghiên cứu khoa học bắt buộc đối với giảng viên, số tiến sĩ tăng, thành lập các nhóm nghiên cứu mạnh. Kinh phí thưởng tối đa mỗi năm khoảng 2 tỉ đồng.

Trong khi đó, số bài báo công bố quốc tế của Trường ĐH Mở TP.HCM tăng từ 16 bài năm 2017 lên 62 bài năm 2018. PGS.TS Nguyễn Minh Hà, hiệu trưởng nhà trường, cho biết trường bắt đầu chính sách thưởng công bố quốc tế từ năm 2017 và có điều chỉnh mức thưởng theo hướng tăng lên. Mức thưởng dao động từ 40-100 triệu đồng/bài tùy loại tạp chí.

Theo ông Hà, số bài báo quốc tế tăng lên có tác động rất lớn từ chính sách khuyến khích của trường.

"Nếu không tự chủ, trường sẽ khó có thể đưa ra chính sách khuyến khích với mức thưởng như vậy do tài chính và các quy định liên quan. Việc thưởng tuy chưa nhiều nhưng đã tạo động lực cho giảng viên, nghiên cứu sinh chú ý hơn đến việc công bố. Giảng viên cũng chú ý kết nối với các giáo sư ở các trường nước ngoài".
        </p>
      </Element>

      <Element name="section2" className="element">
        <h1>Section 2</h1>
        {/* Nội dung của phần này */}
      </Element>
    </div>
  );
};

export default MyComponent;
