export const getAxisProps = (text: string, extProps?: any) => ({
    ...extProps,
    title: {
      text: text,
      font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    }
})
