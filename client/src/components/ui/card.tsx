interface CardProps {
	children?: React.ReactNode;
}

function Card({children}: CardProps) {
	return (
		<>
			<div className="border py-4 p-6 bg-white rounded-lg min-h-96">
        {children}
      </div>
		</>
	);
}

export default Card;
