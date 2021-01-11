import 'styled-components';

import {ThemeType} from '@theme/index'

declare module 'styled-components' {
	export interface DefaultTheme extends ThemeType {}
}