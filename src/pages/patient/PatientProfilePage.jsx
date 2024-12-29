import React, { useState } from 'react';

const PatientProfilePage = ({ patient = {}, testResults = [] }) => {
  
  const [selectedTest, setSelectedTest] = useState(null);

  const handleCardClick = (testName) => {
    if (selectedTest === testName) {
      setSelectedTest(null);
    } else {
      setSelectedTest(testName);
    }
  };

  const groupedResults = testResults.reduce((acc, result) => {
    if (!acc[result.testName]) {
      acc[result.testName] = [];
    }
    acc[result.testName].push(result);
    return acc;
  }, {});

  // Sort the test results by date in descending order for each test group
  Object.keys(groupedResults).forEach((testName) => {
    groupedResults[testName].sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
  });

  return (
    <div className="p-6 font-sans">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">HỒ SƠ BỆNH ÁN</h2>
        <div className="flex items-center">          
          <img
            src={patient.image ||"https://via.placeholder.com/150"}
            alt="Patient"
            className="w-auto h-48 object-cover rounded-md mr-6"
          />
          <div className="h-48 w-full p-4 border border-gray-300 rounded-md">
            <p><span className="font-semibold">Họ và tên:</span> {patient.name || 'Không có thông tin'}</p>
            <p><span className="font-semibold">Giới tính:</span> {patient.gender || 'Không có thông tin'}</p>
            <p><span className="font-semibold">Tuổi:</span> {patient.age || 'Không có thông tin'}</p>
            <p><span className="font-semibold">Số điện thoại:</span> {patient.phone || 'Không có thông tin'}</p>
            <p><span className="font-semibold">Địa chỉ:</span> {patient.address || 'Không có thông tin'}</p>
            <p><span className="font-semibold">Mã bệnh nhân:</span> {patient.id || 'Không có thông tin'}</p>
          </div>
        </div>
      </section>

      {/* Danh sách kết quả xét nghiệm */}
      <section>
        <h2 className="text-xl font-bold mb-4">Danh Sách Kết Quả Xét Nghiệm</h2>

        {/* Card view for each test type */}
        {Object.keys(groupedResults).map((testName) => {
          const latestTestResult = groupedResults[testName][0]; // Show the latest test result in the card
          return (
            <div
              key={testName}
              className="mb-4 border p-4 rounded-md cursor-pointer hover:bg-gray-100"
              onClick={() => handleCardClick(testName)}
            >
              <h3 className="font-semibold">{testName}</h3>
              <p>
                <span>Lần xét nghiệm gần nhất:</span> {latestTestResult.date}
              </p>
              <p>
                <span>Kết quả:</span> {latestTestResult.result}
              </p>

              {selectedTest === testName && (
                <div className="mt-4">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">STT</th>
                        <th className="border border-gray-300 px-4 py-2">Ngày thực hiện</th>
                        <th className="border border-gray-300 px-4 py-2">Kết quả</th>
                        <th className="border border-gray-300 px-4 py-2">Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedResults[testName].map((result, index) => (
                        <tr key={index} className="odd:bg-white even:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                          <td className="border border-gray-300 px-4 py-2">{result.date}</td>
                          <td className="border border-gray-300 px-4 py-2">{result.result}</td>
                          <td className="border border-gray-300 px-4 py-2">{result.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default PatientProfilePage;
