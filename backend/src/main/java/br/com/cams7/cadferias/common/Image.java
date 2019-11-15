/**
 * 
 */
package br.com.cams7.cadferias.common;

import java.awt.AlphaComposite;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.imageio.ImageIO;

import br.com.cams7.cadferias.error.AppException;

/**
 * @author ceanm
 *
 */
public final class Image {

	/**
	 * 
	 * @param source    The image to resize.
	 * @param imageType Image extension .
	 * @param width     The maximum width you want the new image to be, use 0 for
	 *                  source width.
	 * @param height    The maximum height you want the new image to be, use 0 for
	 *                  source height.
	 * @return resized image.
	 */
	public static byte[] resize(byte[] source, ImageType imageType, Integer width, Integer height) {
		try (ByteArrayInputStream bis = new ByteArrayInputStream(source)) {
			BufferedImage image = ImageIO.read(bis);

			int type = image.getType() == 0 ? BufferedImage.TYPE_INT_ARGB : image.getType();

			// *Special* if the width or height is 0 use image src dimensions
			if (width == 0)
				width = image.getWidth();
			if (height == 0)
				height = image.getHeight();

			int fHeight = height;
			int fWidth = width;

			// Work out the resized width/height
			if (image.getHeight() > height || image.getWidth() > width) {
				fHeight = height;
				int wid = width;
				float sum = (float) image.getWidth() / (float) image.getHeight();
				fWidth = Math.round(fHeight * sum);

				if (fWidth > wid) {
					// rezise again for the width this time
					fHeight = Math.round(wid / sum);
					fWidth = wid;
				}
			}

			BufferedImage resizedImage = new BufferedImage(fWidth, fHeight, type);
			Graphics2D g = resizedImage.createGraphics();
			g.setComposite(AlphaComposite.Src);

			g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
			g.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
			g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

			g.drawImage(image, 0, 0, fWidth, fHeight, null);
			g.dispose();

			try (ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
				ImageIO.write(resizedImage, imageType.name().toLowerCase(), bos);
				return bos.toByteArray();
			}
		} catch (IOException e) {
			throw new AppException(e.getMessage(), e);
		}
	}

	public static enum ImageType {
		PNG, JPG, JPEG
	}

}
