import { trackEvent } from '@/amplitude';

import { OnboardingButtons, SignUpMethods } from '@/types';

export const trackOnboardingWelcomeScreenButtonClicked = (buttonName: OnboardingButtons) => {
  trackEvent('Onboarding_Welcome_Screen_Button_Clicked', {
    name_of_the_button: buttonName,
  });
};

export const trackOnboardingSignUpCompleted = (signUpMethod: SignUpMethods) => {
  trackEvent('Onboarding_Sign_Up_Completed', {
    sign_up_method: signUpMethod,
  });
};

export const trackDepositIconButtonClicked = () => {
  trackEvent('Deposit_Icon_Button_Clicked');
};

export const trackCoinAndNetworkForDepositSelected = (
  coinSelected = 'unknown',
  networkSelected = 'unknown'
) => {
  trackEvent('Coin_And_Network_For_Deposit_Selected', {
    coin_selected: coinSelected,
    network_selected: networkSelected,
  });
};

export const trackWalletAddressForDepositCopied = () => {
  trackEvent('Wallet_Address_For_Deposit_Copied');
};

export const trackWalletFullAddressViewed = () => {
  trackEvent('Wallet_Full_Address_Viewed');
};

export const trackWalletAddressShared = () => {
  trackEvent('Wallet_Address_Shared');
};

export const trackSwapIconButtonClicked = () => {
  trackEvent('Swap_Icon_Button_Clicked');
};

export const trackTokenSwapped = (swapFrom: string, swapTo: string, fromAmount: number) => {
  trackEvent('Token_Swapped', {
    swap_from: swapFrom,
    swap_to: swapTo,
    from_amount: fromAmount,
  });
};

export const trackWithdrawIconButtonClicked = () => {
  trackEvent('Withdraw_Icon_Button_Clicked');
};

export const trackFundsWithdrawn = (
  coinSelected: string,
  networkSelected: string,
  amount: number
) => {
  trackEvent('Funds_Withdrawn', {
    coin_selected: coinSelected,
    network_selected: networkSelected,
    amount: amount,
  });
};

export const trackPortfolioIconClicked = () => {
  trackEvent('Portfolio_Icon_Clicked');
};

export const trackTreemapChartClicked = (sectionName: string) => {
  trackEvent('Treemap_Chart_Clicked', {
    treemap_section_name: sectionName,
  });
};

export const trackCurrentTokenPriceChecked = () => {
  trackEvent('Current_Token_Price_Checked');
};

export const trackAssetsTabClicked = () => {
  trackEvent('Assets_Tab_Clicked');
};

export const trackYourBalanceTabClicked = () => {
  trackEvent('Your_Balance_Tab_Clicked');
};

export const trackHistoryTabClicked = () => {
  trackEvent('History_Tab_Clicked');
};

export const trackTradeButtonClicked = () => {
  trackEvent('Trade_Button_Clicked');
};

export const trackUserLoggedOut = () => {
  trackEvent('User_Logged_Out');
};

export const trackUserClosedTheApp = () => {
  trackEvent('User_Closed_The_App');
};
