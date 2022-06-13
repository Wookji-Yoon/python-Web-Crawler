import { useQuery } from "react-query";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { fetchReviews } from "../api";
import { pageAtom } from "../atoms";
import xlsx from "json-as-xlsx";
import styled from "styled-components";

interface DownloadProps {
  name: string;
}

const Button = styled.button`
  width: 100%;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 10px;
  border: 0px;
  margin: 10px;
  cursor: pointer;
  &:hover {
    background-color: #c3cbd6;
  }
`;

function Download({ name }: DownloadProps) {
  const { id } = useParams();
  const page = useRecoilValue(pageAtom);
  const today = new Date().toLocaleDateString();

  const { isLoading, data, isError } = useQuery(
    "reviews",
    () => fetchReviews(id, page),
    { onError: (error: Error) => console.log(error.message) }
  );

  const xlsxSettings = {
    fileName: `${name}(${today})_잡플래닛리뷰`,
    extraLength: 3,
    writeOptions: {},
  };
  const handleClick = () => {
    xlsx([data], xlsxSettings);
  };

  if (isLoading) {
    return (
      <>
        <span>정상적으로 수집이 진행 중입니다. </span>
        <span>잠시만 기다려주세요!</span>
      </>
    );
  } else if (isError) {
    return <span>에러가 발생했습니다!</span>;
  } else {
    return (
      <>
        <span>정상적으로 수집이 진행 중입니다. </span>
        <span>잠시만 기다려주세요!</span>
        <span>수집이 완료되었습니다.</span>
        <Button onClick={handleClick}>Download</Button>
      </>
    );
  }
}

export default Download;
