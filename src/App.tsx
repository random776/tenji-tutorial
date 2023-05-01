import useTypedBrailleStrings from "./components/useTypedBrailleStrings";
import * as Tenji from 'tenji'
import { useState } from "react"

export default function App(): JSX.Element {
  const sumiji : string[] = ["一","二","三","四","五","六","七","八","九","十"];
  const [problem, setProblem] = useState(0);
  const [visible, setVisible] = useState(false);
  const [typedBrailleStrings, setTypedBrailleStrings] =
    useTypedBrailleStrings();
  return (
    <>
      <h2>点字（漢字対応）仮ツール</h2>
      <p>問題：「{sumiji[problem]}」を点字に直してください。</p>
      <input
        value={typedBrailleStrings}
        onKeyDown={(e) => {
          setTypedBrailleStrings(e);
        }}
        onKeyUp={(e) => {
          setTypedBrailleStrings(e);
        }}
      />
      <button 
      type="button"
      key={"answer"}
      onClick={() =>{
        setVisible(true);
      }}
      >答え合わせ</button>
      <div style={{ visibility: visible ? "visible" : "hidden"}}>
      <p>
        結果：{Tenji.fromTenji(typedBrailleStrings, {kanji: true})}
      </p>
      <p>
        あなたの答え：{typedBrailleStrings}
      </p>
      <p>
        模範解答：{Tenji.toTenji(sumiji[problem], {kanji: true})}
      </p>
      <p>
        正誤：{Tenji.fromTenji(typedBrailleStrings, {kanji: true}) === Tenji.fromTenji(sumiji[problem], {kanji: true}) ? <span>正解</span> : <span>不正解</span> }
      </p>
      <button 
      type="button"
      key={"answer"}
      onClick={() =>{
        setVisible(false);
      }}
      >再チャレンジ</button>
      {problem <= sumiji.length - 1 && <button 
      type="button"
      key={"answer"}
      onClick={() =>{
        setVisible(false);
        setProblem(problem + 1);
      }}
      >次の問題へ</button>}
      {problem >= 1 && <button 
      type="button"
      key={"answer"}
      onClick={() =>{
        setVisible(false);
        setProblem(problem - 1);
      }}
      >前の問題に戻る</button>}
      </div>
    </>
  );
}