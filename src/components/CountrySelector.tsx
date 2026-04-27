import React from 'react';
import { Country } from '../types';
import { COUNTRIES } from '../constants';
import { MapPin, Check, X, Flag } from 'lucide-react';

interface CountrySelectorProps {
  selectedCountry: Country;
  onSelect: (country: Country) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({ selectedCountry, onSelect, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" style={{direction: 'rtl'}}>
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-mint-50">
          <h3 className="font-cairo font-bold text-lg text-mint-900 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            اختر اد^"ة
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">`n            <X className="h-5 w-5" />`n          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {COUNTRIES.map((country) => (
            <button
              key={country.id}
              onClick={() => {
                onSelect(country);
                onClose();
              }}
              className={`w-full flex items-center justify-between p-4 rounded-xl mb-1 transition-all ${
                selectedCountry.id === country.id
                  ? 'bg-mint-50 border border-mint-200 shadow-sm'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Flag className="h-5 w-5 text-mint-500" />
                <span className="font-semibold text-gray-800 font-cairo">{country.name}</span>
              </div>
              {selectedCountry.id === country.id && (
                <Check className="w-5 h-5 text-mint-600" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


