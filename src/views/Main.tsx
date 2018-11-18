import VProgressCircular from '../../components/vue/vuetify/VProgressCircular/VProgressCircular';
import { ProgressCircular } from '../../components/vue/vuetify/VProgressCircular/ProgressCircular';

export const Main = () => {
	let value$ = 10;
	setInterval(() => {
		value$ = value$ + 10;
		if (value$ > 100) {
			value$ = 0;
		}
	}, 1000);
	return (
		<div>
			{/* <VProgressCircular value="60" indeterminate={true} /> */}
			<ProgressCircular value$={value$} />
			{/* <ProgressCircular value$={40} />
			<ProgressCircular value$={60} />
			<ProgressCircular value$={60} indeterminate={true} /> */}
		</div>
	);
};
