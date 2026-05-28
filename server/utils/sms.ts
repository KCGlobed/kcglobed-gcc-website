

export const sendSms = async (mobile: string, message: string) => {
    const config = useRuntimeConfig();

    // Ensure mobile has 91 prefix if it's 10 digits
    const formattedMobile = mobile.length === 10 ? `91${mobile}` : mobile;

    const params: any = {
        APIKey: config.smsApiKey,
        senderid: config.smsSenderId,
        channel: '2',
        DCS: '0',
        flashsms: '0',
        number: formattedMobile,
        text: message,
        route: 1,
    };

    // Add DLT parameters if provided
    if (config.smsEntityId) params.entityid = config.smsEntityId;
    if (config.smsTemplateId) params.templateid = config.smsTemplateId;

    const queryParams = new URLSearchParams(params);

    // Exact endpoint provided by user
    const url = `http://sms.webinfosys.net/api/mt/SendSMS?${queryParams.toString()}`;

    // Log URL with masked API Key for debugging
    let maskedUrl = url;
    if (config.smsApiKey) {
        maskedUrl = url.replace(config.smsApiKey, '********');
    }
    console.log('[SMS] Sending to:', maskedUrl);

    if (!config.smsApiKey || !config.smsSenderId) {
        console.error('[SMS] Configuration missing: smsApiKey or smsSenderId is not set');
        return { success: false, error: 'SMS configuration missing' };
    }

    try {
        const response: any = await $fetch(url);
        console.log('[SMS] Raw Response:', response);

        // Handle both string and JSON responses
        let resData = response;
        if (typeof response === 'string') {
            try {
                resData = JSON.parse(response);
            } catch (e) {
                console.log('[SMS] Response is not JSON');
            }
        }

        if (resData && (resData.ErrorCode === '000' || resData.ErrorMessage === 'Success' || resData.status === 'success')) {
            return { success: true, response: resData };
        }
        console.warn('[SMS] Gateway returned failure:', resData);
        return { success: false, response: resData };
    } catch (error: any) {
        console.error('[SMS] Fetch Error:', error.data || error.message || error);
        return { success: false, error };
    }
};