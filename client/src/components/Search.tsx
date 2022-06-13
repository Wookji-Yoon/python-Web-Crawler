import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { searchAtom } from "../atoms";

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
const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 480px;
  position: relative;
  margin: 10px;

  input {
    width: 100%;
    height: 40px;
    border-radius: 20px;
    padding: 0px 20px;
    font-size: 14px;
    border-color: grey;
  }
  span {
    position: absolute;
    right: 15px;
  }
`;

function Search() {
  const [search, setSearch] = useRecoilState(searchAtom);
  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
  };

  return (
    <Container>
      <Header>잡플래닛 리뷰 수집</Header>
      <SearchForm>
        <input
          value={search}
          onChange={handleSearch}
          type="text"
          placeholder="기업이름을 입력하세요"
        />
        <span>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </span>
      </SearchForm>
    </Container>
  );
}

export default Search;
