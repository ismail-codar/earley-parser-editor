import { Button } from '../../components/button/Button';
import { Select } from '../../components/select/Select';

export const Main = () => {
	return (
		<div>
			<Button variant="secondary">Buton 2</Button>
			<Select
				button={
					<Button onClick={(e) => console.log(e)} variant="primary">
						Dropdown 1
					</Button>
				}
			/>
			<span className="chip">Chip Label</span>
			<span className="chip">
				<i className="chip-icon">C</i>Chip Label
			</span>
		</div>
	);
};
