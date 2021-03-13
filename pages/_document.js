import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <script dangerouslySetInnerHTML={{
                        __html: `(function(w,d, s, id) {if(typeof(w.webpushr)!=='undefined') return;w.webpushr=w.webpushr||function(){(w.webpushr.q=w.webpushr.q||[]).push(arguments)};var js, fjs = d.getElementsByTagName(s)[0];js = d.createElement(s); js.id = id;js.async=1;js.src = "https://cdn.webpushr.com/app.min.js";
                        fjs.parentNode.appendChild(js);}(window,document, 'script', 'webpushr-jssdk'));
                        webpushr('setup',{'key':'BGjv_hCmCvLHqfQDsTBLBl5Td9iGMUMoIgzo-WygbxF6TWHkH7HusuSqB4IKBXr3GvpWf2iq8d-lXyx0I_6ogSU' });`,
                    }}>
                    </script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
