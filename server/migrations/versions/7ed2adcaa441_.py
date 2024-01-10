"""empty message

Revision ID: 7ed2adcaa441
Revises: f6c2c28e37e4
Create Date: 2024-01-09 13:48:38.104350

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7ed2adcaa441'
down_revision = 'f6c2c28e37e4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('event_posts')
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('event_id', sa.UUID(), nullable=True))
        batch_op.drop_index('ix_posts_created')
        batch_op.create_index(batch_op.f('ix_posts_created'), ['created'], unique=False)
        batch_op.create_foreign_key(batch_op.f('fk_posts_event_id_events'), 'events', ['event_id'], ['id'], ondelete='CASCADE')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_posts_event_id_events'), type_='foreignkey')
        batch_op.drop_index(batch_op.f('ix_posts_created'))
        batch_op.create_index('ix_posts_created', ['created'], unique=False)
        batch_op.drop_column('event_id')

    op.create_table('event_posts',
    sa.Column('id', sa.UUID(), server_default=sa.text('gen_random_uuid()'), autoincrement=False, nullable=False),
    sa.Column('event_id', sa.UUID(), autoincrement=False, nullable=False),
    sa.Column('post_id', sa.UUID(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], name='fk_event_posts_event_id_events', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], name='fk_event_posts_post_id_posts', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name='event_posts_pkey')
    )
    # ### end Alembic commands ###