import { useLocation } from "react-router";
import { useRecoilValue } from "recoil";
import styled, { keyframes } from "styled-components";
import { pageAtom } from "../atoms";
import Download from "./Download";
import SelectPage from "./SelectPage";

interface ILocation {
  state: {
    name: string;
  };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  font-weight: bold;
  margin-top: 50px;
`;

const animation = keyframes`
from {
  opacity:0;
  transform: translate3d(0,40%,0)
}
to{
  opacity:1;
  transform: translateZ(0)
}
`;

const Message = styled.div`
  width: 460px;
  margin-top: 10px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: left;
  span {
    display: block;
    margin-bottom: 12px;
    margin-left: 10px;
    animation: ${animation} 0.4s ease-in-out;
    letter-spacing: 0.5px;
  }
  form {
    animation: ${animation} 0.4sease-in-out;
  }
`;

function Reviews() {
  const { state } = useLocation() as ILocation;
  const { name } = state;
  const page = useRecoilValue(pageAtom);

  return (
    <Container>
      <Header>잡플래닛 리뷰 수집</Header>
      <Message>
        <span>{name}의 리뷰를 수집합니다.</span>
        <span>페이지 수를 설정합니다.</span>
        {page === 0 ? (
          <SelectPage />
        ) : (
          <>
            <span>
              {page * 5}개({page}p)의 리뷰를 수집합니다.
            </span>
            <span>2~5분 정도의 시간이 소요됩니다.</span>
            <Download name={name} />
          </>
        )}
      </Message>
    </Container>
  );
}

export default Reviews;
