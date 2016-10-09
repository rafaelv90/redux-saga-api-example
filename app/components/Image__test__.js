import 'ignore-styles';
import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import Image from './Image';

const image = {
  url: 'http://some-giphy-permalink.url',
  images: {
    fixed_width: {
      url: 'http://some-image.url'
    },
    original: {
      url: 'http://some-image.url/giphy.gif'
    }
  }
};

describe('<Image />', () => {
  it('Should render as expected', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render( <Image image={image} /> );
    const ReactComponent = renderer.getRenderOutput();

    expect( ReactComponent.type ).toEqual('div');
    expect( ReactComponent.props.children.length ).toEqual(2);

    const imageContainer = ReactComponent.props.children[0];
    expect( imageContainer.type ).toEqual('a');

    const preloadFadeInImage = imageContainer.props.children;
    expect( preloadFadeInImage.type).toEqual( 'img' );
    expect( preloadFadeInImage.props.src ).toEqual('http://some-image.url');

    const githubEmbedInput = ReactComponent.props.children[1].props.children[1];
    expect( githubEmbedInput.type).toEqual('input');
    expect( githubEmbedInput.props.defaultValue).toEqual('<img src="http://some-image.url/giphy.gif" width="100%" />');

    const githubEmbedLabel = ReactComponent.props.children[1].props.children[0];
    expect( githubEmbedLabel ).toEqual('Github embed code');
  });

  xit('Should select all input text when input receives focus', () => {
    // ReactTestUtils.Simulate.click(node)
    // console.log(window.getSelection().toString());
  });
});
