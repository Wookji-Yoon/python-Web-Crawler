import { useSetRecoilState } from "recoil";
import { pageAtom } from "../atoms";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface IForm {
  page: number;
}

const PageForm = styled.form`
  display: flex;
  align-items: center;
  width: 480px;
  position: relative;
  margin: 10px;

  input {
    width: 300px;
    height: 30px;
    font-size: 14px;
  }
  button {
    border: 0px;
    cursor: pointer;
    height: 35px;
    margin-left: 4px;
    &:hover {
      background-color: #c3cbd6;
    }
  }
`;

function SelectPage() {
  const setPage = useSetRecoilState(pageAtom);
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    setPage(data.page);
  };

  return (
    <PageForm onSubmit={handleSubmit(onValid)}>
      <input
        {...register("page")}
        type="number"
        placeholder="마지막 페이지를 입력하세요"
      />
      <button>설정</button>
    </PageForm>
  );
}

export default SelectPage;
