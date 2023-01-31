import styled from '@emotion/styled'
import { Button } from '@mui/material'

export const PrimaryButton = styled(Button)(
	({ theme }) => `
    	font-family: ${theme.typography.fontFamily};
		border-radius: 0;
        background: ${theme.palette.secondary.main};
        color: ${theme.palette.text.dark};
        font-size: 14px;

        &:hover {
			background: ${theme.palette.primary.transparency};
            color: ${theme.palette.secondary.main}
		}
    `
)

export const SecondaryButton = styled(Button)(
	({ theme }) => `
    	font-family: ${theme.typography.fontFamily};
		border-radius: 0;
        background: ${theme.palette.primary.light};
        color: ${theme.palette.text.dark};
        font-size: 14px;

        &:hover {
			background: ${theme.palette.secondary.light};
		}
    `
)
