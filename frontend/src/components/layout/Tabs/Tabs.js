import React from "react";
import * as S from "./styled";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./style.css";

const TabGrp = (props) => {
	const data = props.tabs;

	return (
		<Tabs>
			{/* To show the tabs */}
			<TabList>
				<S.TabWrapper>
					{Object.keys(data).map((key) => {
						return (
							<Tab
								selectedClassName={`react-tabs__tab--selected selected-${
									data[key].color ? data[key].color : "accent"
								}`}
								disabled={data[key].disabled}
							>
								{key}
							</Tab>
						);
					})}
				</S.TabWrapper>
			</TabList>

			{/* Content to show per tab */}
			{Object.keys(data).map((key) => {
				return <TabPanel>{data[key].component}</TabPanel>;
			})}
		</Tabs>
	);
};

export default TabGrp;
