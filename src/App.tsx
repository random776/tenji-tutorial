import useTypedBrailleStrings from "./components/useTypedBrailleStrings";
import * as Tenji from 'tenji'
import { useState } from "react"

export default function App(): JSX.Element {
  const sumiji : string[] = ["東大","五十歩百歩","百聞は一見にしかず","初期微動継続時間"];
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
      {problem <= 2 && <button 
      type="button"
      key={"answer"}
      onClick={() =>{
        setVisible(false);
        setProblem(problem + 1);
      }}
      >次の問題へ</button>}
      </div>
    </>
  );
}