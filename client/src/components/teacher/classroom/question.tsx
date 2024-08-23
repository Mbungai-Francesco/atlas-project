import { Question as quesType } from "@/types";

interface QuestionProps {
	question: quesType;
}

const Question = ({ question }: QuestionProps) => {
	return (
		<>
			<div>
				<p>Question</p>
				<p>{question.question}</p>
			</div>
			<div>
        <p>Options</p>
				<ul className="flex space-x-2">
					{question.options?.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
				</ul>
			</div>
      <div>
        <p>Anwser</p>
        <p>{question.answer}</p>
      </div>
		</>
	);
};

export default Question;
