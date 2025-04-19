import { writable, derived } from 'svelte/store';

// Create a writable store for language
export const language = writable('en');

// Create a derived store for text direction
export const textDirection = derived(language, ($language) => {
	return $language === 'ar' ? 'rtl' : 'ltr';
});

const translations = {
	en: {
		title: 'Secure Password Generator',
		description:
			'Use this free Password Generator to create highly secure passwords that are difficult to crack or guess. Just select the criteria for the passwords you need, and click "Generate Password". Remember, the more options you choose, the more secure the passwords will be.',
		generateButton: 'Generate Password',
		customizeTitle: 'Customize your password',
		includeUppercase: 'Include uppercase letters',
		includeLowercase: 'Include lowercase letters',
		includeNumbers: 'Include numbers',
		includeSymbols: 'Include symbols',
		passwordLength: 'Password length:',
		copied: 'Copied!',
		qrCodeTitle: 'Password QR Code',
		search: 'Search',
		languageName: 'English'
	},
	es: {
		title: 'Generador de Contraseñas Seguras',
		description:
			'Utilice este Generador de Contraseñas gratuito para crear contraseñas altamente seguras que sean difíciles de descifrar o adivinar. Simplemente seleccione los criterios para las contraseñas que necesita y haga clic en "Generar Contraseña". Recuerde, cuantas más opciones elija, más seguras serán las contraseñas.',
		generateButton: 'Generar Contraseña',
		customizeTitle: 'Personalice su contraseña',
		includeUppercase: 'Incluir letras mayúsculas',
		includeLowercase: 'Incluir letras minúsculas',
		includeNumbers: 'Incluir números',
		includeSymbols: 'Incluir símbolos',
		passwordLength: 'Longitud de la contraseña:',
		copied: '¡Copiado!',
		qrCodeTitle: 'Código QR de la Contraseña',
		search: 'Buscar',
		languageName: 'Español'
	},
	fr: {
		title: 'Générateur de Mot de Passe Sécurisé',
		description:
			'Utilisez ce Générateur de Mot de Passe gratuit pour créer des mots de passe hautement sécurisés difficiles à craquer ou à deviner. Sélectionnez simplement les critères pour les mots de passe dont vous avez besoin et cliquez sur "Générer un Mot de Passe". Rappelez-vous, plus vous choisissez d\'options, plus les mots de passe seront sécurisés.',
		generateButton: 'Générer un Mot de Passe',
		customizeTitle: 'Personnalisez votre mot de passe',
		includeUppercase: 'Inclure des lettres majuscules',
		includeLowercase: 'Inclure des lettres minuscules',
		includeNumbers: 'Inclure des chiffres',
		includeSymbols: 'Inclure des symboles',
		passwordLength: 'Longueur du mot de passe:',
		copied: 'Copié !',
		qrCodeTitle: 'Code QR du Mot de Passe',
		search: 'Rechercher',
		languageName: 'Français'
	},
	de: {
		title: 'Sicherer Passwortgenerator',
		description:
			'Verwenden Sie diesen kostenlosen Passwortgenerator, um hochsichere Passwörter zu erstellen, die schwer zu knacken oder zu erraten sind. Wählen Sie einfach die Kriterien für die benötigten Passwörter aus und klicken Sie auf "Passwort generieren". Denken Sie daran: Je mehr Optionen Sie wählen, desto sicherer werden die Passwörter sein.',
		generateButton: 'Passwort generieren',
		customizeTitle: 'Passen Sie Ihr Passwort an',
		includeUppercase: 'Großbuchstaben einschließen',
		includeLowercase: 'Kleinbuchstaben einschließen',
		includeNumbers: 'Zahlen einschließen',
		includeSymbols: 'Symbole einschließen',
		passwordLength: 'Passwortlänge:',
		copied: 'Kopiert!',
		qrCodeTitle: 'Passwort QR-Code',
		search: 'Suchen',
		languageName: 'Deutsch'
	},
	it: {
		title: 'Generatore di Password Sicure',
		description:
			'Usa questo Generatore di Password gratuito per creare password altamente sicure difficili da decifrare o indovinare. Seleziona semplicemente i criteri per le password di cui hai bisogno e clicca su "Genera Password". Ricorda, più opzioni scegli, più sicure saranno le password.',
		generateButton: 'Genera Password',
		customizeTitle: 'Personalizza la tua password',
		includeUppercase: 'Includi lettere maiuscole',
		includeLowercase: 'Includi lettere minuscole',
		includeNumbers: 'Includi numeri',
		includeSymbols: 'Includi simboli',
		passwordLength: 'Lunghezza della password:',
		copied: 'Copiato!',
		qrCodeTitle: 'Codice QR della Password',
		search: 'Cerca',
		languageName: 'Italiano'
	},
	ja: {
		title: '安全なパスワード生成ツール',
		description:
			'この無料のパスワード生成ツールを使用して、解読や推測が困難な高度に安全なパスワードを作成します。必要なパスワードの条件を選択し、「パスワードを生成」をクリックするだけです。オプションを多く選択するほど、パスワードの安全性が高くなることを覚えておいてください。',
		generateButton: 'パスワードを生成',
		customizeTitle: 'パスワードをカスタマイズ',
		includeUppercase: '大文字を含める',
		includeLowercase: '小文字を含める',
		includeNumbers: '数字を含める',
		includeSymbols: '記号を含める',
		passwordLength: 'パスワードの長さ:',
		copied: 'コピーしました！',
		qrCodeTitle: 'パスワードQRコード',
		search: '検索',
		languageName: '日本語'
	},
	ko: {
		title: '안전한 비밀번호 생성기',
		description:
			'이 무료 비밀번호 생성기를 사용하여 해독하거나 추측하기 어려운 고도로 안전한 비밀번호를 만드세요. 필요한 비밀번호 기준을 선택하고 "비밀번호 생성"을 클릭하기만 하면 됩니다. 더 많은 옵션을 선택할수록 비밀번호가 더 안전해진다는 점을 기억하세요.',
		generateButton: '비밀번호 생성',
		customizeTitle: '비밀번호 사용자 정의',
		includeUppercase: '대문자 포함',
		includeLowercase: '소문자 포함',
		includeNumbers: '숫자 포함',
		includeSymbols: '기호 포함',
		passwordLength: '비밀번호 길이:',
		copied: '복사됨!',
		qrCodeTitle: '비밀번호 QR 코드',
		search: '검색',
		languageName: '한국어'
	},
	zh: {
		title: '安全密码生成器',
		description:
			'使用这个免费的密码生成器来创建难以破解或猜测的高度安全的密码。只需选择您需要的密码标准，然后点击"生成密码"。请记住，您选择的选项越多，密码就越安全。',
		generateButton: '生成密码',
		customizeTitle: '自定义您的密码',
		includeUppercase: '包含大写字母',
		includeLowercase: '包含小写字母',
		includeNumbers: '包含数字',
		includeSymbols: '包含符号',
		passwordLength: '密码长度：',
		copied: '已复制！',
		qrCodeTitle: '密码二维码',
		search: '搜索',
		languageName: '中文'
	},
	ar: {
		title: 'مولد كلمات المرور الآمنة',
		description:
			'استخدم مولد كلمات المرور المجاني هذا لإنشاء كلمات مرور آمنة للغاية يصعب اختراقها أو تخمينها. ما عليك سوى تحديد معايير كلمات المرور التي تحتاجها والنقر فوق "إنشاء كلمة المرور". تذكر، كلما اخترت المزيد من الخيارات، كلما كانت كلمات المرور أكثر أمانًا.',
		generateButton: 'إنشاء كلمة المرور',
		customizeTitle: 'تخصيص كلمة المرور الخاصة بك',
		includeUppercase: 'تضمين الأحرف الكبيرة',
		includeLowercase: 'تضمين الأحرف الصغيرة',
		includeNumbers: 'تضمين الأرقام',
		includeSymbols: 'تضمين الرموز',
		passwordLength: 'طول كلمة المرور:',
		copied: 'تم النسخ!',
		qrCodeTitle: 'رمز QR لكلمة المرور',
		search: 'بحث',
		languageName: 'العربية'
	},
	pt: {
		title: 'Gerador de Senhas Seguras',
		description:
			'Use este Gerador de Senhas gratuito para criar senhas altamente seguras que são difíceis de decifrar ou adivinhar. Basta selecionar os critérios para as senhas que você precisa e clicar em "Gerar Senha". Lembre-se, quanto mais opções você escolher, mais seguras serão as senhas.',
		generateButton: 'Gerar Senha',
		customizeTitle: 'Personalize sua senha',
		includeUppercase: 'Incluir letras maiúsculas',
		includeLowercase: 'Incluir letras minúsculas',
		includeNumbers: 'Incluir números',
		includeSymbols: 'Incluir símbolos',
		passwordLength: 'Comprimento da senha:',
		copied: 'Copiado!',
		qrCodeTitle: 'Código QR da Senha',
		search: 'Pesquisar',
		languageName: 'Português'
	},
	ru: {
		title: 'Генератор Безопасных Паролей',
		description:
			'Используйте этот бесплатный Генератор Паролей для создания высоконадежных паролей, которые трудно взломать или угадать. Просто выберите критерии для нужных вам паролей и нажмите "Сгенерировать Пароль". Помните, чем больше опций вы выберете, тем безопаснее будут пароли.',
		generateButton: 'Сгенерировать Пароль',
		customizeTitle: 'Настройте свой пароль',
		includeUppercase: 'Включить заглавные буквы',
		includeLowercase: 'Включить строчные буквы',
		includeNumbers: 'Включить цифры',
		includeSymbols: 'Включить символы',
		passwordLength: 'Длина пароля:',
		copied: 'Скопировано!',
		qrCodeTitle: 'QR-код Пароля',
		search: 'Поиск',
		languageName: 'Русский'
	},
	hi: {
		title: 'सुरक्षित पासवर्ड जनरेटर',
		description:
			'उच्च सुरक्षित पासवर्ड बनाने के लिए इस मुफ्त पासवर्ड जनरेटर का उपयोग करें जो क्रैक करने या अनुमान लगाने में कठिन हैं। बस आपको जिन पासवर्ड के लिए मानदंड चुनने हैं, उन्हें चुनें और "पासवर्ड जनरेट करें" पर क्लिक करें। याद रखें, जितने अधिक विकल्प आप चुनेंगे, पासवर्ड उतने ही अधिक सुरक्षित होंगे।',
		generateButton: 'पासवर्ड जनरेट करें',
		customizeTitle: 'अपना पासवर्ड कस्टमाइज़ करें',
		includeUppercase: 'बड़े अक्षर शामिल करें',
		includeLowercase: 'छोटे अक्षर शामिल करें',
		includeNumbers: 'संख्याएँ शामिल करें',
		includeSymbols: 'प्रतीक शामिल करें',
		passwordLength: 'पासवर्ड की लंबाई:',
		copied: 'कॉपी किया गया!',
		qrCodeTitle: 'पासवर्ड QR कोड',
		search: 'खोज',
		languageName: 'हिन्दी'
	}
};

// Enhanced translation function with fallback
export function t(key: string): string {
	let currentLang;
	language.subscribe((value) => {
		currentLang = value;
	})();

	// Check if translation exists in current language
	if (translations[currentLang]?.[key]) {
		return translations[currentLang][key];
	}

	// Fallback to English
	return translations.en[key] || key;
}

// Function to get available languages
export function getAvailableLanguages() {
	return Object.keys(translations).map((code) => ({
		code,
		name: translations[code].languageName || code
	}));
}

// Add language name to each language's translations
// This allows languages to display their own name in their own script
for (const lang in translations) {
	if (!translations[lang].languageName) {
		// Use the existing name if not defined
		const existingNames = {
			en: 'English',
			es: 'Español',
			fr: 'Français',
			de: 'Deutsch',
			it: 'Italiano',
			ja: '日本語',
			ko: '한국어',
			zh: '中文',
			ar: 'العربية',
			pt: 'Português',
			ru: 'Русский',
			hi: 'हिन्दी'
		};
		translations[lang].languageName = existingNames[lang] || lang;
	}
}
