describe('editableSpan', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        // url берем из storybook с заменой части на iframe.html?id= (чтото похожее на ?path=/docs/)
        await page.goto('http://localhost:9009/iframe.html?id=editablespan-component--editable-span-base-example&viewMode=story',
            {waitUntil: "networkidle2"});

        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});