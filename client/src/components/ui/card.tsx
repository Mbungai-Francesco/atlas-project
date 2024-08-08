interface CardProps {
	children?: React.ReactNode;
}

function Card({children}: CardProps) {
	return (
		<>
			<div className="border p-4 bg-white rounded-lg">
        {children}
      </div>
		</>
	);
}

export default Card;
