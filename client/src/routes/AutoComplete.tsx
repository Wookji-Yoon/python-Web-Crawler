import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled, { keyframes } from "styled-components";
import { fetchAutoComplete } from "../api";
import { searchAtom } from "../atoms";

interface IAuto {
  id: number;
  label: string;
  name: string;
}

const Container = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const AutoButtons = styled.div`
  display: flex;
  width: 480px;
  padding-left: 30px;
  justify-content: left;
  align-items: center;
  button {
    animation: ${animation} 0.4s ease-in-out;
  }
`;

const AutoButton = styled.button`
  width: 140px;
  height: 50px;
  font-size: 14px;
  border-radius: 10px;
  border: 0px;
  margin-right: 5px;
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c3cbd6;
  }
`;

function AutoComplete() {
  const search = useRecoilValue(searchAtom);
  const { isLoading, data: auto } = useQuery<IAuto[]>(search, () =>
    fetchAutoComplete(search)
  );

  return (
    <Container>
      {isLoading ? (
        "Loading..."
      ) : (
        <AutoButtons>
          {auto?.map((company) => (
            <Link to={`/reviews/${company.id}`} state={{ name: company.name }}>
              <AutoButton>{company.name}</AutoButton>
            </Link>
          ))}
        </AutoButtons>
      )}
    </Container>
  );
}

export default AutoComplete;
