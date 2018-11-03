import { Button } from '../../components/button/Button';

export const Main = () => {
	return (
		<div>
			<Button onClick={(e) => console.log(e)} variant="primary">
				Buton 1
			</Button>
			<Button variant="secondary">Buton 2</Button>
		</div>
	);
};
