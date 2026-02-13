'use client';

import { useState, useEffect } from 'react';

interface CurrencyInfo {
    code: string;
    symbol: string;
    isLoading: boolean;
}

const CURRENCY_SYMBOLS: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    AUD: '$',
    CAD: '$',
    CHF: 'Fr',
    CNY: '¥',
    INR: '₹',
    MXN: '$',
    BRL: 'R$',
    ZAR: 'R',
    AED: 'د.إ',
    SAR: 'ر.س',
};

const COUNTRY_TO_CURRENCY: Record<string, string> = {
    US: 'USD',
    GB: 'GBP',
    JP: 'JPY',
    AU: 'AUD',
    CA: 'CAD',
    CH: 'CHF',
    CN: 'CNY',
    IN: 'INR',
    MX: 'MXN',
    BR: 'BRL',
    ZA: 'ZAR',
    AE: 'AED',
    SA: 'SAR',
};

export const useCurrencyDetection = (): CurrencyInfo => {
    const [currencyInfo, setCurrencyInfo] = useState<CurrencyInfo>({
        code: 'USD',
        symbol: '$',
        isLoading: true,
    });

    useEffect(() => {
        const detectCurrency = async () => {
            try {
                // Use ipapi.co for free geolocation
                const response = await fetch('https://ipapi.co/json/', {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' },
                });

                if (!response.ok) throw new Error('Failed to fetch location');

                const data = await response.json();
                const countryCode = data.country_code || 'US';
                const currencyCode = COUNTRY_TO_CURRENCY[countryCode] || data.currency || 'USD';
                const currencySymbol = CURRENCY_SYMBOLS[currencyCode] || '$';

                setCurrencyInfo({
                    code: currencyCode,
                    symbol: currencySymbol,
                    isLoading: false,
                });
            } catch (error) {
                console.error('Currency detection failed:', error);
                // Fallback to USD
                setCurrencyInfo({
                    code: 'USD',
                    symbol: '$',
                    isLoading: false,
                });
            }
        };

        detectCurrency();
    }, []);

    return currencyInfo;
};
