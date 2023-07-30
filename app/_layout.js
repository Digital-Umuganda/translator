import { StyleSheet, Text, View, Image } from "react-native";
import { Stack, Tabs, useNavigation, useRouter } from 'expo-router';
import { useCallback, useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from ".";
import { TailwindProvider } from 'tailwind-rn';
import utilities from '../tailwind.json';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Favorites from "./favorites";
import { Svg, Path } from "react-native-svg";

SplashScreen.preventAutoHideAsync();


export default function Layout() {
	// Navigation
	const navigation = useNavigation();

	// Effect
	useEffect(() => {
		navigation.addListener('beforeRemove', (e) => {
			e.preventDefault();
			console.log('onback');
			// Do your stuff here
			navigation.dispatch(e.data.action);
		});
	}, []);

	const [fontsLoaded] = useFonts({
		'Poppins': require('../assets/fonts/poppins/Poppins-Regular.ttf'),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	function LogoTitle() {
		return (
			<Image
				style={{ width: 98, height: 34 }}
				source={require('../assets/icon.png')}
			/>
		);
	}

	// const Stack = createNativeStackNavigator();

	return (
		<TailwindProvider utilities={utilities}>
			<Tabs
				screenOptions={{
					headerStyle: {
						backgroundColor: '#000',
					},
					headerTintColor: '#fff',
					headerTitle: (props) => <LogoTitle {...props} />,
					headerTitleAlign: 'center',
					headerBackVisible: false,
				}}>
				<Tabs.Screen
					// Name of the route to hide.
					name="home"
					options={{
						tabBarIcon: (props) => (
							<Svg width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
								<Path d="M20.2197 9.76142L11.0452 1.32081C10.4255 0.750663 9.46639 0.770634 8.87095 1.36608L0.433024 9.80406L0 10.237V22.6764H8.13103V14.9149H12.5661V22.6764H20.6972V10.2007L20.2197 9.76142ZM9.98075 2.3844C9.99377 2.3844 9.98573 2.38722 9.98014 2.39272C9.97437 2.38722 9.96772 2.3844 9.98075 2.3844ZM19.2188 21.198H14.0445V14.9149C14.0445 14.0984 13.3826 13.4365 12.5661 13.4365H8.13103C7.31455 13.4365 6.65266 14.0984 6.65266 14.9149V21.198H1.47837V10.8494L9.98075 2.41143L9.98185 2.40981L19.2188 10.8494V21.198Z" fill="black" />
							</Svg>
						),
						tabBarLabel: "Home"
					}}
				/>
				<Tabs.Screen
					// Name of the route to hide.
					name="maps"
					options={{
						tabBarIcon: (props) => (
							<Svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
								<Path d="M20.7563 2.18207C20.5927 2.04903 20.3751 2.0026 20.1715 2.05723L13.8572 4.02838L7.52982 0.815399C7.35476 0.734385 7.15295 0.734385 6.97789 0.815399L0.40738 3.50274C0.159807 3.60444 -0.00133256 3.84615 8.30447e-06 4.1138V17.5702C0.00109645 17.7887 0.110758 17.9924 0.292585 18.1136C0.474411 18.2348 0.704604 18.2577 0.906739 18.1747L7.22757 15.5793L13.5287 18.812C13.6222 18.8599 13.7259 18.8847 13.8309 18.8843C13.8963 18.8942 13.9627 18.8942 14.0281 18.8843L20.5986 16.8343C20.8833 16.7451 21.0721 16.4753 21.0585 16.1773V2.71428C21.0516 2.49792 20.9385 2.29885 20.7563 2.18207ZM19.7115 15.691L14.2449 17.3994V15.8947H13.1936V17.2088L7.67437 14.3769V13.2665H6.62308V14.3967L1.31411 16.5846V4.54745L6.62308 2.35947V3.90354H7.67437V2.36604L13.1936 5.19136V6.57117H14.2449V5.34248L19.7115 3.60787V15.691Z" fill="black" />
								<Path d="M13.1936 8.01013H14.2449V10.5135H13.1936V8.01013Z" fill="black" />
								<Path d="M13.1936 11.9524H14.2449V14.4558H13.1936V11.9524Z" fill="black" />
								<Path d="M6.62305 5.3819H7.67433V7.88526H6.62305V5.3819Z" fill="black" />
								<Path d="M6.62305 9.37018H7.67433V11.8341H6.62305V9.37018Z" fill="black" />
							</Svg>
						),
						tabBarLabel: "Maps"
					}}
				/>
				<Tabs.Screen
					// Name of the route to hide.
					name="links"
					options={{
						tabBarIcon: (props) => (
							<Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
								<Path d="M17.445 20.1763H1.90537V4.28348H10.3815V2.87079H0.492676V21.589H18.8577V11.7001H17.445V20.1763Z" fill="black" />
								<Path d="M13.2069 0.39856V1.81125H19.2715L8.11621 12.9666L9.11508 13.9654L20.2704 2.81016V8.87473H21.6831V0.39856H13.2069Z" fill="black" />
							</Svg>
						),
						tabBarLabel: "Links"
					}}
				/>
				<Tabs.Screen
					// Name of the route to hide.
					name="search"
					options={{
						tabBarIcon: (props) => (
							<Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<Path d="M8.2574 0.754639C4.24925 0.754639 1 4.00389 1 8.01204C1 12.0202 4.24925 15.2694 8.25741 15.2694C12.2656 15.2694 15.5148 12.0202 15.5148 8.01204C15.5148 4.00446 12.2655 0.755147 8.2574 0.754639Z" stroke="black" stroke-width="1.5" />
								<Path d="M13.6719 13.4266L18.7404 18.4951" stroke="black" stroke-width="1.5" stroke-linecap="round" />
							</Svg>
						),
						tabBarLabel: "Search",
					}}
				/>
				<Tabs.Screen
					// Name of the route to hide.
					name="index"
					options={{
						tabBarIcon: (props) => (
							<Svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
								<Path d="M9.89583 16.2678L10.5623 14.8516C9.90394 14.1953 9.28061 13.5048 8.69485 12.783C9.18397 12.1233 9.6397 11.4464 10.0621 10.7522C11.2342 8.82778 12.1419 6.75434 12.7607 4.58773L15.1533 4.58773V3.10936H8.50062V0.522217H7.02225V3.10936H0V4.58773H2.76132C3.48348 7.11645 4.59725 9.51646 6.06215 11.7005C6.39135 11.2939 6.70821 10.8774 7.01227 10.4517C5.84545 8.62996 4.93372 6.65696 4.30251 4.58773L11.2202 4.58773C9.84686 9.09352 7.31428 12.405 5.36958 14.4336C3.10615 16.7947 1.12148 17.9845 1.10171 17.9962L1.1766 18.1227L1.47837 18.6322L1.85443 19.2686C1.94096 19.2175 4.00148 17.9875 6.3999 15.495C6.8736 15.0028 7.32697 14.4957 7.76 13.9737C8.4287 14.7775 9.14176 15.5434 9.89583 16.2678Z" fill="black" />
								<Path d="M14.6784 9.02283L14.414 9.60106L8.93384 21.589H10.5594L12.2489 17.893H18.7967L20.4862 21.589H22.1117L16.3672 9.02283H14.6784ZM14.414 16.4147H12.9247L14.414 13.1569L15.5228 10.7315L18.1208 16.4147H14.414Z" fill="black" />
							</Svg>
						),
						tabBarLabel: "Translate"
					}}
				/>
				<Tabs.Screen
					// Name of the route to hide.
					name="favorites"
					options={{
						// This tab will no longer show up in the tab bar.
						href: null,
					}}
				/>
			</Tabs>
		</TailwindProvider>
	);
}
