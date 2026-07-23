import { useFontSize } from "../../providers/useContext";
import RadioBox from "./RadioBox";

export default function FontSizeSetRadioBox() {
	const { fontSize, setFontSize } = useFontSize();
	const handleChange = (e) => {
		setFontSize(e.target.value);
	};
	return (
		<div className="flex flex-start">
			<RadioBox name="fontSize" value="normal" checked={fontSize === "normal"} onChange={handleChange}>
				보통
			</RadioBox>

			<RadioBox name="fontSize" className="size-lg" value="large" checked={fontSize === "large"} onChange={handleChange}>
				크게
			</RadioBox>
		</div>
	);
}
